import axios from "axios";
import starFightersRepository from "../repositories/starFightersRepository.js"

async function getInfosFromAPI(firstUser: string, secondUser: string) {

    console.log(firstUser, secondUser)

    let infosFirstUser;
    let infosSecondUser;

    try {
        infosFirstUser = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        infosSecondUser = await axios.get(`https://api.github.com/users/${secondUser}/repos`);

        // console.log("infosFirstUser:", infosFirstUser.data, " infosSecondUser: ", infosSecondUser.data)

    } catch (e) {
        throw { type: "axios", message: "Erro ao obter informações da API do github" }
    }

    let firstUserStars = 0;
    let secondUserStars = 0;

    infosFirstUser.data.forEach(element => {
        firstUserStars += element.stargazers_count
    });
    infosSecondUser.data.forEach(element => {
        secondUserStars += element.stargazers_count
    });

    console.log("firstuserStars: ", firstUserStars, "second user stars: ", secondUserStars)

    let objectResponse = {
        winner: null, // nulo se empate
        loser: null, //nulo se empate
        draw: true // true se empate
    }

    if (firstUserStars > secondUserStars) {
        objectResponse.winner = firstUser;
        objectResponse.loser = secondUser;
        objectResponse.draw = false;

        const existFirstUser = await starFightersRepository.selecUserByUsername(firstUser)
        if (existFirstUser.rowCount === 0) {
            starFightersRepository.createUser(firstUser, 1, 0, 0)
        } else {
            starFightersRepository.editUser(firstUser, 1, 0, 0)
        }

        const existSecondUser = await starFightersRepository.selecUserByUsername(secondUser)
        if (existSecondUser.rowCount === 0) {
            starFightersRepository.createUser(secondUser, 0, 1, 0)
        } else {
            starFightersRepository.editUser(secondUser, 0, 1, 0)
        }

        return objectResponse;

    }
    if (secondUserStars > firstUserStars) {
        objectResponse.winner = secondUser;
        objectResponse.loser = firstUser;
        objectResponse.draw = false;

        const existSecondUser = await starFightersRepository.selecUserByUsername(secondUser)
        if (existSecondUser.rowCount === 0) {
            starFightersRepository.createUser(secondUser, 1, 0, 0)
        } else {
            starFightersRepository.editUser(secondUser, 1, 0, 0)
        }

        const existFirstUser = await starFightersRepository.selecUserByUsername(firstUser)
        if (existFirstUser.rowCount === 0) {
            starFightersRepository.createUser(firstUser, 0, 1, 0)
        } else {
            starFightersRepository.editUser(firstUser, 0, 1, 0)
        }
        return objectResponse;

    }

    const existFirstUser = await starFightersRepository.selecUserByUsername(firstUser)
    if (existFirstUser.rowCount === 0) {
        starFightersRepository.createUser(firstUser, 0, 0, 1)
    } else {
        starFightersRepository.editUser(firstUser, 0, 0, 1)
    }

    const existSecondUser = await starFightersRepository.selecUserByUsername(secondUser)
    if (existSecondUser.rowCount === 0) {
        starFightersRepository.createUser(secondUser, 0, 0, 1)
    } else {
        starFightersRepository.editUser(secondUser, 0, 0, 1)
    }

    return objectResponse;
}


const starfightersService = {
    getInfosFromAPI
}

export default starfightersService