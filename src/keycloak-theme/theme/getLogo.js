/*
 * Copyright (c) 2021, CedSoft, All Rights Reserved
 * @author: Cedric Rische <cedricrische@cedsoft.de>
 * @project: Enroll
 */


import invertColor from "./InvertColor";
import config from "../../config";

function getLogo(hex){
    console.log(invertColor(hex, true))
    return invertColor(hex, true) === "#000000" ? config.logo.dark : config.logo.light
}

export default getLogo;
