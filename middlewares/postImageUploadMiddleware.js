const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');
const { Question } = require('../models/question');

class S3ImageController {
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'gwonyeong', //버켓 이름
      acl: 'public-read', //접근 권한
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        const { postId } = req.params;
        console.log(file);
        let ext = file.mimetype.split('/')[1]; // 확장자
        // 이미지만 처리
        if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
          Question.destroy({
            where: { postId, imgUrl: 'default' },
          })
            .then(() => {
              return cb(
                new exception.NotFoundException('이미지 파일이 아닙니다!')
              );
            })
            .catch((err) => {
              return cb(
                new exception.NotFoundException(
                  '이미지 파일이 아닙니다! + 게시물 없음'
                )
              );
            });
          return cb(new exception.NotFoundException('이미지 파일이 아닙니다!'));
        }

        cb(null, `post/${Date.now()}.${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10메가로 용량 제한
  });
}

module.exports = S3ImageController;
