const { PersonIncrement, Person } = require('../modules/person');
exports.index = async (req, res, next) => {
    try {
        result = await Person.find();
        action = (req.session.action ? action = req.session.action : null);
        if (req.session.action != undefined) {
            delete req.session.action
        }
        res.render('index', { result: result, action: action });
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        if (req.method == 'GET') {
            res.render('create');
        }
        if (req.method == 'POST') {
            result = await new Person(
                {
                    _id: await getIncrement(),
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }
            ).save();
            if (result) {
                req.session.action = `Create PersonID:<b>${result.id}</b> Successfully`;
            }
            return res.redirect('/');

        }
    } catch (error) {
        next(error)
    }
}
exports.update = async (req, res, next) => {
    try {
        if (req.method == 'GET') {
            result = await Person.findOne({ _id: parseInt(req.params.id) });
            res.render('update', { result: result });
        }
        if (req.method == 'POST') {
            result = await Person.findOneAndUpdate({ _id: parseInt(req.params.id) }, { '$set': { firstname: req.body.firstname, lastname: req.body.lastname } }, { new: true });
            if (result) {
                req.session.action = `Update PersonID:<b>${result.id}</b> Successfully`;
            }
            return res.redirect('/');
        }
    } catch (error) {
        next(error)
    }
}
exports.delete = async (req, res, next) => {
    try {
        result = await Person.deleteOne({ _id: parseInt(req.params.id) });
        if (result) {
            req.session.action = `Delete PersonID:<b>${req.params.id}</b> Successfully`;
        }
        return res.redirect('/');
    } catch (error) {
        next(error)
    }
}
async function getIncrement() {
    Increment = await PersonIncrement.findOneAndUpdate({ _id: 'auto_increment' }, { '$inc': { value: +1 } }, { new: true });
    if (!Increment) {
        Increment = await new PersonIncrement({
            _id: "auto_increment",
            value: 1
        }).save()
    }
    return Increment.value;
}