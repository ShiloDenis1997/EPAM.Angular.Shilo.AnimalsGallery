using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using ORM;

//http://kids.nationalgeographic.com/animals/lion/#lion-pride.jpg

namespace AnimalsGallery.Controllers
{
    public class PicturesController : Controller
    {
        private static readonly string picturePrefix = "/Pictures/Picture";

        private static int Id { get; set; } = 100;
        private DbContext context;

        public PicturesController(DbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public JsonResult GetAllAlbums()
        {
            var albums = new Dictionary<string, Dictionary<string, object>>();
            IEnumerable<Album> albumsList = context.Set<Album>().Include(a => a.Images).ToList();
            foreach (Album album in albumsList)
            {
                List<object> imagesList = new List<object>();
                foreach (Image image in album.Images)
                {
                    imagesList.Add(new
                    {
                        image = $"{picturePrefix}/{image.PictureId}",
                        desc = image.Name,
                        format = image.ImageFormat.Format,
                        id = image.Id,
                        date = image.CreationDate.ToString()
                    });
                }
                var albumToAdd = new Dictionary<string, object>
                {
                    {"images", imagesList},
                    {"rating", album.Rating},
                    {"userId", album.UserId},
                    {"name", album.Name }
                };
                albums.Add(album.Name, albumToAdd);
            }
            return Json(albums, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreateAlbum(string albumName, int userId)
        {
            User user = context.Set<User>().Find(userId);

            if (user == null)
                return null;
            try
            {
                Album album = new Album { Name = albumName };
                user.Albums.Add(album);
                context.SaveChanges();
                return Json(new { status = true });
            }
            catch
            {
                return Json(new { status = false });
            }
        }

        [HttpPost]
        public JsonResult RemoveImage(int id)
        {
            Image image = context.Set<Image>().Find(id);
            if (image == null)
            {
                return Json(new { status = true });
            }

            Picture picture = image.Picture;

            try
            {
                context.Set<Image>().Remove(image);
                if (picture.Images.Count == 1)
                    context.Set<Picture>().Remove(picture);
                context.SaveChanges();
                return Json(new { status = true });
            }
            catch
            {
                return Json(new { status = false });
            }
        }

        [HttpGet]
        public JsonResult GetAllFormats()
        {
            var imageFormats = context.Set<ImageFormat>().Select(f => f.Format).ToList();
            return Json(imageFormats, JsonRequestBehavior.AllowGet);
        }

        private ImageFormat GetImageFormat(string format)
        {
            ImageFormat imageFormat = context.Set<ImageFormat>().FirstOrDefault(f => f.Format.Equals(format));
            if (imageFormat != null)
            {
                return imageFormat;
            }

            imageFormat = context.Set<ImageFormat>().Add(new ImageFormat { Format = format });
            context.SaveChanges();
            return imageFormat;
        }

        [HttpPost]
        public ActionResult AddImage(string name, string data, string albumName)
        {
            Album album = context.Set<Album>().FirstOrDefault(a => a.Name.Equals(albumName));
            if (album == null)
                return Json(new { status = false });
            string[] dataSegments = data.Split(',');
            string format = dataSegments[0].Split('/', ';')[1];

            ImageFormat imageFormat = GetImageFormat(format);

            Picture picture = new Picture { PictureData = Convert.FromBase64String(dataSegments[1]) };
            picture = context.Set<Picture>().Add(picture);
            Image image = new Image
            {
                Name = name,
                IsApproved = false,
                PictureId = picture.Id,
                AlbumId = album.Id,
                CreationDate = DateTime.Now,
                ImageFormat = imageFormat
            };

            image = context.Set<Image>().Add(image);
            context.SaveChanges();

            return Json(new
            {
                status = true,
                image = $"{picturePrefix}/{image.PictureId}",
                desc = image.Name,
                id = image.Id,
                date = image.CreationDate.ToString(),
                format = imageFormat.Format
            });
        }



        // GET: Pictures
        public void Picture(int id)
        {
            Picture picture = context.Set<Picture>().Find(id);
            Response.BinaryWrite(picture.PictureData);
        }
    }
}