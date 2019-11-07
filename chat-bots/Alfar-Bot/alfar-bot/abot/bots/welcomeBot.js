// Import required Bot Framework classes.

const { DialogBot } = require('./dialogBot');

class WelcomeBot extends DialogBot {
    /**
     *
     * @param {UserState} User state to persist boolean flag to indicate
     *                    if the bot had already welcomed the user
     */

    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);

        // Send welcome messages to conversation members when they join the conversation
        // Messages are only sent to conversation members who are arent the bot
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            // Iterate over all new mewmbers to conversation
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                // Greet anyone that was not the target of this message
                // Since the bot is the recipient for events from the channel,
                // context.activity.membersAdded === context.activity.recipient.Id indicates the
                // bot was added to the conversation, and the opposite indicates this is a user.
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const reply = `Welcome to Alfar. We will help you buy and sell real estate properties.`;
                    await context.sendActivity(reply);
                }
            }

            // By calling next() you ensure that the next BotHandler is run
            await next();
        });
    }
}

module.exports.WelcomeBot = WelcomeBot;
