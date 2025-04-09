const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); // Consultar el modelo de usuario

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Incorrect password or email.' });
        } else {
            const match = await user.matchPassword(password); // Asegúrate de que esta función sea asíncrona
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password or email.' });
            }
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Usar async/await para manejar la consulta
        done(null, user);
    } catch (err) {
        done(err, null); // Manejar errores correctamente
    }
});