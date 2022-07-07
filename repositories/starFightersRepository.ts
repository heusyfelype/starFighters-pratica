import connection from "../dbConnection.js"

async function selecUserByUsername(username: string) {
    const selectUser = await connection.query(`
        SELECT * FROM fighters WHERE "username"=$1
    `, [username])

    return selectUser
}

async function createUser(username: string, win: number, lose: number, draw: number) {
    await connection.query(`
        INSERT INTO "fighters" (username, wins, losses, draws) VALUES ($1, $2, $3, $4)
    `, [`${username}`, win, lose, draw]);

    return;
}

async function editUser(username: string, win: number, lose: number, draw: number) {
    await connection.query(`
        UPDATE "fighters" SET wins = wins + $1, losses = losses + $2, draws = draws + $3 WHERE "username" = $4
    `, [win, lose, draw, `${username}`])
    return;
}

const starfightersRepository = {
    selecUserByUsername,
    createUser,
    editUser
}

export default starfightersRepository