module.exports  = (req, res, next) => {
    if(req.session && req.session.user){
        return req.session.user.isAdmin ? next() : res.redirect('/')
    }else{
        return res.redirect('/users/login')
    }
}
// EN UNA LINEA req.session && req.session.user ? req.session.user.isAdmin ? next() : res.redirect('/') : res.redirect('/users/login');

