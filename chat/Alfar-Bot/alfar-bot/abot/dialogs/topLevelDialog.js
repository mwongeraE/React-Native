const { ComponentDialog, TextPrompt, DialogSet, NumberPrompt, WaterfallDialog, ChoicePrompt, ChoiceFactory } = require('botbuilder-dialogs');
const { BuyingDialog, BUYING_DIALOG } = require('./BuyingDialog');
const { SellingDialog, SELLING_DIALOG } = require('./SellingDialog');

const { UserProfile } = require('../userProfile');

const TOP_LEVEL_DIALOG = 'TOP_LEVEL_DIALOG';

const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const TEXT_PROMPT = 'TEXT_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
// const USER_PROFILE = 'USER_PROFILE';
// const DIALOG_STATE_PROPERTY = 'dialogState';

class TopLevelDialog extends ComponentDialog {
    constructor() {
        super(TOP_LEVEL_DIALOG);

        // this.userProfile = userState.createProperty(USER_PROFILE);

        // this.dialogState = this.conversationState.createProperty(DIALOG_STATE_PROPERTY);

        this.dialogs = new DialogSet(this.dialogState);

        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));

        this.addDialog(new BuyingDialog());
        this.addDialog(new SellingDialog());

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            // this.introStep.bind(this),
            this.nameStep.bind(this),
            this.ageStep.bind(this),
            this.startSelectionStep.bind(this),
            // this.acknowledgementStep.bind(this)
            this.transactionStep.bind(this),
            this.transactionConfirmStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async introStep(stepContext) {
        const nameIntro = 'Hello, how are you today? \n Welcome to Alfar. My name is Lucy, your assistant for today';
        return await stepContext.context.sendActivity(nameIntro);
    }

    async nameStep(stepContext) {
        // Create an object in which to collect the user's information within the dialog
        stepContext.values.userInfo = new UserProfile();

        const promptOptions = { prompt: 'Please enter your name.' };

        // Ask the user to enter their age
        return await stepContext.prompt(TEXT_PROMPT, promptOptions);
    }

    async ageStep(stepContext) {
        stepContext.values.userInfo.name = stepContext.result;

        const promptOptions = { prompt: 'Please enter your age.' };

        // Ask the user to enter their age
        return await stepContext.prompt(NUMBER_PROMPT, promptOptions);
    }

    async startSelectionStep(stepContext) {
        // Set the user's age to what they entered in response to the age prompt.
        stepContext.values.userInfo.age = stepContext.result;

        if (stepContext.result < 25) {
            // If they are too young, skip the review selection dialog, and pass an empty list to the next step.
            await stepContext.context.sendActivity('You must be 25 or older to participate.');
        } else {
            // Otherwise, start the review selection dialog.
            await stepContext.context.sendActivity('You may proceed');
            return await stepContext.next();
        }
    }

    /**
    async acknowledgementStep(stepContext) {
        // Set the user's age to what they entered in response to age prompt
        const userProfile = stepContext.values.userInfo;

        await stepContext.context.sendActivity(`Thanks for participating ${ userProfile.name }`);

        return await stepContext.endDialog(userProfile);
    }
    */
    async transactionStep(stepContext) {
        // stepContext.values.userInfo.name = stepContext.result;
        const userProfile = stepContext.values.userInfo;

        // Waterfall always finishes with the end of the waterfall or with a another dialog, Here it's a choice dialog
        return await stepContext.prompt(CHOICE_PROMPT, {
            prompt: `Glad to meet you ${ userProfile.name }. We help you buy and sell property. What would you like to do?`,
            choices: ChoiceFactory.toChoices(['BUY', 'SELL'])
        });
    }

    async transactionConfirmStep(stepContext) {
        console.log(stepContext.result);
        stepContext.values.userInfo.transaction = stepContext.result;
        // console.log('morgageStep.confirm');

        let dialogToRun;

        switch (stepContext.result.value) {
        case 'BUY':
            dialogToRun = BUYING_DIALOG;
            break;
        case 'SELL':
            dialogToRun = SELLING_DIALOG;
            break;
        default:
            break;
        };
        if (dialogToRun !== undefined) {
            return await stepContext.beginDialog(dialogToRun);
        }
        return await stepContext.context.sendActivity('How may i help you?');

        // By calling next() you ensure that the next botHandler is run
        // return await stepContext.next();
    }
}

module.exports.TopLevelDialog = TopLevelDialog;
module.exports.TOP_LEVEL_DIALOG = TOP_LEVEL_DIALOG;
