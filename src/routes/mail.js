const {
    getMailsFromSender,
    getSystemMetrics,
    getMetricsFromSender,
} = require("../db");
const express = require("express");
let router = express.Router();

/**
 * Get metrics from the overall system
 */
const getMetrics = async (req, res) => {
    const metrics = await getSystemMetrics();

    return res.status(200).json(metrics);
};

/**
 * Get metrics from a specific email address
 */
const getUserMetrics = async (req, res) => {
    const mails = await getMailsFromSender(req.body.sender);
    const metrics = await getMetricsFromSender(req.body.sender);

    return res.status(200).json({
        metrics,
        mails,
    });
};


/**
 * @swagger
 * /mails:
 *  post:
 *      description: Returns metrics for the given user
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user mail
 *          description: The mail address to get metrics from
 *          schema:
 *              type: object
 *              required: true
 *              properties:
 *                  sender:
 *                      type: string
 *      responses:
 *          200:
 *              description: successful operation
 */
router.post('/mails', getUserMetrics);

/**
 * @swagger
 * /mails:
 *  get:
 *      description: Get metrics from the overall system
 *      responses:
 *          200:
 *              description: successful operation
 */
router.get('/mails', getMetrics);

module.exports = router;
