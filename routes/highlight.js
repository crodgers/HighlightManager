module.exports = (req, res) => {
    const highlightId = req.params.id * 1;
    res.status(200).json({'id': highlightId});
}