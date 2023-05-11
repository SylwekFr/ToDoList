const express = require('express');
const router = express.Router();

module.exports = function (io, iosession) {
  router.get('/', function (req, res) {
    res.render('index.ejs');
  });

  router.get('/private/', function (req, res) {
    res.render('todolist.ejs', { todolist: req.session.todolist });
  });

  router.post('/private/add/', function (req, res) {
    if (req.body.addtodo !=''){
        req.session.todolist.push(req.body.addtodo);
    }
    res.redirect('/private/');

  });

  router.get('/private/delete/:index', function (req, res) {
    if (req.param.index != '') {
        req.session.todolist.splice(req.params.index, 1);
    }

    res.redirect('/private/');
  });

  router.get('/shared/', function (req, res) {
    res.render('shared.ejs');
  });

  router.use(function (req, res) {
    res.redirect('/');
  });

  return router;
};