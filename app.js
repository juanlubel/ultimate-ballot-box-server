'use script'

const express = require('express')
const bodyParsed = require('body-parser')
const mongoose = require('mongoose')

const Student = require('./models/student')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParsed.urlencoded({ extended: false }))
app.use(bodyParsed.json())

app.get('/api/students', (req, res) => {

    Student.find({}, (err, students) => {
        if (err) res.status(500).send({msg: 'Error en la petición'})

        if (!students) res.status(404).send({msg: 'No existe ningun estudiante'})

        res.status(200).send({ students })
    })
})

app.post('/api/student', (req, res) => {
    console.log('POST Student', req.body)

    let student = new Student()
    student.name = req.body.name

    student.save((err, studentStored) => {
        if (err) throw res.status(500).send({msg: 'Student no guardado'})

        res.status(200).send({success: 'Well Done!', student: studentStored})
    })
})

app.get('/api/student/:id', (req, res) => {
    console.log('hola')
    let id = req.params.id
    console.log(id)

    Student.findById(id, (err, student) => {
        if (err) res.status(500).send({msg: 'Error en la petición'})

        if (!student) res.status(404).send({msg: 'El estudiando no existe'})

        res.status(200).send({ student })
    })
})

app.put('/api/student/:id', (req, res) => {
    let id = req.params.id
    let update = req.body

    Student.findByIdAndUpdate(id, update, (err, student) => {
        if (err) res.status(500).send({msg: 'Error al updatear'})

        res.status(200).send({student})
    })
})
app.put('/api/student_plus/:id', (req, res) => {
    let id = req.params.id
    let update = req.body

    Student.findByIdAndUpdate(id, {$inc:{votes:1}}, (err, student) => {
        if (err) res.status(500).send({msg: 'Error al updatear'})

        res.status(200).send({student})
    })
})
app.put('/api/student_less/:id', (req, res) => {
    let id = req.params.id
    let update = req.body

    Student.findByIdAndUpdate(id, {$inc:{votes:-1}}, (err, student) => {
        if (err) res.status(500).send({msg: 'Error al updatear'})

        res.status(200).send({student})
    })
})

app.delete('/api/student/:id', (req, res) => {
    let id = req.params.id

    Student.findById(id, (err, student) => {
        if (err) res.status(500).send({msg: 'Error al eliminar'})

        student.remove(err => {
            if (err) res.status(500).send({msg: 'Error al eliminar'})
            res.status(200).send({msg: 'Estudiante eliminado'})
        })
    })
})

mongoose.connect('mongodb://localhost:27017/school', (err, res) => {
    if (err) throw err
    console.log('Conectado')
    app.listen(port, () => {
        console.log(`API Rest => http://localhost:${port}`)
    })
})



