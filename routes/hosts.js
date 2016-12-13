var express = require('express'),
    Host = require('../models/Host');
    User = require('../models/User');
    Reservation = require('../models/Reservation');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/');
  }
}

router.get('/new', needAuth, function(req, res, next) {
  res.render('hosts/edit',{host : {id : null}});
});

router.get('/:id', needAuth, function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if(!user){
      req.flash('danger', '잘못된 접근입니다.');
      return res.redirect('/');
    }
    if (err) {
      return next(err);
    }
    else{
      Host.find({}, function(err, hosts) {
      res.render('hosts/index',{hosts : hosts});
      });
    }
  });
});

router.get('/edit/:id', needAuth, function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
    if(!host){
      req.flash('danger', '잘못된 접근입니다.');
      return res.redirect('/');
    }
    if (err) {
      return next(err);
    }
    else{
      res.render('hosts/edit',{host : host});
    }
  });
});

router.get('/info/:id', needAuth, function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
    if(!host){
      req.flash('danger', '잘못된 접근입니다.');
      return res.redirect('/');
    }
    if (err) {
      return next(err);
    }
    Reservation.find({host_id: req.params.id}, function(err, reservations){
        res.render('hosts/info',{host : host, reservations : reservations});
    });
  });
});

router.put('/:id', function(req, res, next) {
  Host.findById({_id: req.params.id}, function(err, host) {
    if (err) {
      return next(err);
    }

    host.location = req.body.location;
    host.address = req.body.address;
    host.detail = req.body.detail;
    host.price = req.body.price;
    host.content = req.body.content;


    host.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '호스팅 정보가 변경되었습니다.');
      res.redirect('/hosts/' + host.master_id);
    });
  });
});


router.post('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if(!user){
      req.flash('danger', '잘못된 접근입니다.');
      return res.redirect('/');
    }
    if (err) {
      return next(err);
    }

    var newHost = new Host({
      title: req.body.title,
      location: req.body.location,
      address: req.body.address,
      detail: req.body.detail,
      price: req.body.price,
      content: req.body.content
    });
    newHost.master_id = user.id;
    newHost.master_name = user.name;
    newHost.master_email = user.email;

    newHost.save(function(err) {
      if (err) {
        next(err);
      } else {
        req.flash('success', '방 등록이 완료되었습니다.');
        res.redirect('/hosts/' + req.params.id);
      }
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Host.findOneAndRemove({_id: req.params.id}, function(err) {
    //id로 하나의 게시물을 찾고 삭제함.
    if (err) {
      return next(err);
    }
    req.flash('success', '방 삭제가 완료되었습니다.');
    res.redirect('back');
  });
});

/////////////////////////////////////////////////////////////////
//예약부분

router.get('/reservation/:id', needAuth, function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
    if(!host){
      req.flash('danger', '잘못된 접근입니다.');
      return res.redirect('/');
    }
    if (err) {
      return next(err);
    }else{
      res.render('hosts/reservation',{host: host});
    }
  });
});

//예약을 수락
router.post('/reservation/OK/:id', needAuth, function(req, res, next) {
  Reservation.findById({_id: req.params.id}, function(err, reservation) {
    if (err) {
      return next(err);
    }
    reservation.confirm = 1;
    reservation.save(function(err) {
      if (err) {
        next(err);
      } else {
        req.flash('success', '예약을 수락하였습니다.');
        res.redirect('back');
      }
    });
  });
});
//예약 거절
router.post('/reservation/NO/:id', needAuth, function(req, res, next) {
  Reservation.findById({_id: req.params.id}, function(err, reservation) {
    if (err) {
      return next(err);
    }
    reservation.confirm = -1;
    reservation.save(function(err) {
      if (err) {
        next(err);
      } else {
        req.flash('success', '예약을 거절하였습니다.');
        res.redirect('back');
      }
    });
  });
});
//예약 취소
router.post('/reservation/CANCEL/:id', needAuth, function(req, res, next) {
  Reservation.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', '예약취소가 완료되었습니다.');
    res.redirect('back');
  });
});


//예약
router.post('/reservation/:id', needAuth, function(req, res, next) {
  User.findById({_id: req.params.id}, function(err, user) {
    if (err) {
      return next(err);
    }
    var chin = req.body.checkin;
    var dateArray = chin.split("-");
    var checkindate = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);
    var chout = req.body.checkout;
    dateArray = chout.split("-");
    var checkoutdate = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);
    if(checkindate.getTime() < new Date().getTime() ||
    checkoutdate.getTime() < checkindate.getTime()){
      req.flash('danger', '날짜를 다시 확인해주세요');
      res.redirect('/hosts/info/' + req.body.host_id);
    }else{
      var newReservation = new Reservation({
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        people: req.body.people,
        comment: req.body.comment,
        host_id: req.body.host_id,
        host_address: req.body.host_address,
        host_title: req.body.host_title,
        host_location: req.body.host_location
      });

      newReservation.master_id = user.id;
      newReservation.master_name = user.name;
      newReservation.master_email = user.email;
      newReservation.save(function(err) {
        if (err) {
          next(err);
        } else {
          req.flash('success', '신청이 완료되었습니다.');
          res.redirect('/hosts/info/' + req.body.host_id);
        }
      });
    }
  });
});

module.exports = router;
