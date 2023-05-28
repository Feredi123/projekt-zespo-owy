const { json } = require('express');
const pool = require('../config/database');
const path = require('path');

function getLogin(req,res){
    res.sendFile(path.join(__dirname,'../html/login.html'))
}

function getGrowth(req,res){
    res.sendFile(path.join(__dirname,'../html/growth.html'))
}

function getIndex(req,res){
    res.sendFile(path.join(__dirname,'../html/index.html'))
}

function getLoginfail(req,res){
    res.sendFile(path.join(__dirname,'../html/loginfail.html'))
}

function getManageSkills(req,res){
    res.sendFile(path.join(__dirname,'../html/manage-skills.html'))
}

function getmyAccount(req,res){
    res.sendFile(path.join(__dirname,'../html/my-account.html'))
}

function getRecovery(req,res){
    res.sendFile(path.join(__dirname,'../html/recovery.html'))
}

function getAdminPage(req,res){
    res.sendFile(path.join(__dirname,'../html/admin.html'))
}


module.exports = {
    getLogin,
    getGrowth,
    getIndex,
    getLoginfail,
    getManageSkills,
    getmyAccount,
    getRecovery,
    getAdminPage,
}