using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using ORM;

namespace AnimalsGallery.Controllers
{
    public class PicturesController : Controller
    {
        private static int Id { get; set; } = 100;
        private DbContext context;

        public PicturesController(DbContext context)
        {
            this.context = context;
        }

        private static readonly string prefixPng = "data:image/png;base64,";

        [HttpPost]
        public ActionResult AddImage(string name, string data, string albumName)
        {
            Album album = GetAlbum(albumName);
            string[] dataSegments = data.Split(',');

            Picture picture = new Picture { PictureData = Convert.FromBase64String(dataSegments[1]) };
            picture = context.Set<Picture>().Add(picture);
            Image image = new Image { Name = name, IsApproved = false, PictureId = picture.Id, AlbumId = album.Id };
            image = context.Set<Image>().Add(image);
            //todo change url to name
            try
            {
                context.SaveChanges();
            }
            catch
            {
                return Json(new {status = false});
            }

            return Json(new
            {
                status = true,
                image = image.Picture.PictureData,
                desc = image.Name,
                id = image.Id
            });
        }

        // GET: Pictures
        public JsonResult Picture(string albumName)
        {
            Album album = GetAlbum(albumName);
            
            return Json(new
            {
                image = prefixPng + Convert.ToBase64String(album.Images.FirstOrDefault().Picture.PictureData),
                desc = albumName ?? "Panda",
                id = Id++
            }, JsonRequestBehavior.AllowGet);
        }

        private Album GetAlbum(string albumName)
        {
            Album album = context.Set<Album>().FirstOrDefault(a => a.Name.Equals(albumName));
            //todo remove creating of album here
            return album ?? CreateAlbum(albumName, 1);
        }

        private Album CreateAlbum(string albumName, int userId)
        {
            User user = context.Set<User>().Find(userId);

            if (user == null)
                return null;
            try
            {
                Album album = new Album {Name = albumName};
                user.Albums.Add(album);
                context.SaveChanges();
                return user.Albums.First(a => a.Name.Equals(albumName));
            }
            catch
            {
                return null;
            }
        }
    }
}