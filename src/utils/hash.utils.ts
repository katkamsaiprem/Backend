import bcrypt from "bcryptjs"

// TODO
// code related to bcrypt hash and compare

/**
 * Salt rounds = how many times bcrypt hashes itself
 * Higher rounds = slower to compute = harder to brute force attack
 * 12 is good balance ,not  6 too fast , 20 too slow 
 */
const SALT_ROUNDS: number = 12;


export const hashPassword = async (password: string): Promise<string> => {

    return await bcrypt.hash(password, SALT_ROUNDS)
}