const express = require('express');
const router = express.Router();
const fs = require("fs");

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const comidas = await prisma.comidas.findMany();

    res.render('index', { comidas });
});

router.post('/mod', async (req, res) => {
    const { exclude, add, create, item } = req.body
    // Read
    const itemExistente = await prisma.comidas.findMany({
        where: {
            item,
        },
    })
    console.log(item, exclude, add)

    if (itemExistente.length == 0) {
        // Create
        await prisma.comidas.create({
            data: {
                item,
                quantidade: 1
            }
        });

    } else {
        // Update

        if (exclude == "true") {

            if (itemExistente[0].quantidade == 1) {
                await prisma.comidas.deleteMany({
                    where: {
                        item
                    }
                });

            } else {
                await prisma.comidas.update({
                    where: {
                        item,
                    },
                    data: {
                        quantidade: itemExistente[0].quantidade - 1
                    }
                });
            }

        } else {
            console.log(parseInt(itemExistente[0].quantidade) + 1)
            await prisma.comidas.update({
                where: {
                    item: item
                },
                data: {
                    quantidade: parseInt(itemExistente[0].quantidade) + 1
                }
            });
        }

    }

    let comidas = await prisma.comidas.findMany();
    res.render('index', { comidas });
});

module.exports = router;