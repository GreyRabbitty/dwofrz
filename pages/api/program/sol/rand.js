export default async function handle(req, res) {

    var randomness = Math.random();

    const mint_one = 0.7;
    const none = 0.25;
    const mint_two = 0.03;
    const mint_half = 0.02;

    let result = 1;

    if (randomness < mint_one) {
        result = 1;
        return res.status(200).json(result);
    }

    randomness -= mint_one;



    if (randomness < none) {
        result = 4;
        return res.status(200).json(result);
    }

    randomness -= none;
    
    if (randomness < mint_two) {
        result = 2;
        return res.status(200).json(result);
    }
    randomness -= mint_two;

    if (randomness < mint_half) {
        result = 3;
    }

    return res.status(200).json(result);
}