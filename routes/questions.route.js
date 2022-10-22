const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const QuestionsController = require('../controllers/questions.controller');
const questionsController = new QuestionsController();
const Upload = require('../middlewares/postImageUploadMiddleware');
const upload = new Upload();

router
  .route('/')
  .post(auth, questionsController.createQna)
  .get(questionsController.getQna);

router
  .route('/:questionId')
  .get(questionsController.findByQna)
  .put(auth, questionsController.updateQna)
  .delete(auth, questionsController.deleteQna);

router.route('/:questionId/:answerId').put(auth, questionsController.selectQna);

router
  .route('/:questionId/image')
  .put(
    auth,
    upload.upload.single('postImage'),
    questionsController.updateImage
  );

module.exports = router;
