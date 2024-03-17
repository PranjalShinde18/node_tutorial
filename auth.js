
const Student = require('./models/Student')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (UserName, PassWord, done) => {
    try {

        const user = await Student.findOne({ username: UserName });

        if (!user)
            return done(null, false, { message: 'Incorrect Username.' });


        const isPasswordMatch =await user.comparePassword(PassWord);

        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password.' })
        }

    } catch (err) {
        done(err);
    }
}))

module.exports = passport;