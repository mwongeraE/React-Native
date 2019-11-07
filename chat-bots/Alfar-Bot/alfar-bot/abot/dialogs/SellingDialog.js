const {
    ChoiceFactory,
    ChoicePrompt,
    ConfirmPrompt,
    ComponentDialog,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');

const { UserProfile } = require('../userProfile');

const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
// const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

const SELLING_DIALOG = 'SELLING_DIALOG';

class SellingDialog extends ComponentDialog {
    constructor() {
        super(SELLING_DIALOG);

        // this.userProfile = userState.createProperty(USER_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));

        // eslint-disable-next-line space-in-parens
        this.addDialog(new WaterfallDialog( WATERFALL_DIALOG, [
            this.propertyStep.bind(this),
            this.priceStep.bind(this),
            this.durationStep.bind(this),
            this.townStep.bind(this),
            this.phonenoStep.bind(this),
            this.emailStep.bind(this)
            // this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
    **/

    async propertyStep(stepContext) {
        // stepContext.values.name = stepContext.result;
        console.log(stepContext.result);

        return await stepContext.prompt(CHOICE_PROMPT, {
            prompt: 'What property are you looking to sell?',
            choices: ChoiceFactory.toChoices(['House', 'Apartment', 'Land'])
        });
    }

    async priceStep(step) {
        step.values.property = step.result.value;

        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'How much do think its worth? (Kindly give us an estimate)',
            choices: ChoiceFactory.toChoices(['200k - 1M', '1M-3M', '3M>'])
        });
    }

    async durationStep(step) {
        step.values.price = step.result.value;

        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'How quickly are looking to sell?',
            choices: ChoiceFactory.toChoices(['ASAP', '45-90 Days', '3-6 months'])
        });
    }

    async townStep(step) {
        step.values.property = step.result.value;

        return await step.prompt(NAME_PROMPT, {
            prompt: 'Where is the property located?'
        });
    }

    async phonenoStep(step) {
        step.values.duration = step.result.value;

        return await step.prompt(NUMBER_PROMPT, {
            prompt: 'Kindly help us with your phone number so that we can contact you.'
        });
    }

    async emailStep(step) {
        step.values.duration = step.result.value;

        return await step.prompt(NAME_PROMPT, {
            prompt: 'Whats your email address? One of our agents will send you the selling proposal'
        });
    }

    async summaryStep(step) {
        if (step.result) {
            // Get the current profile object frrom user state
            const userProfile = await this.userProfile.get(step.context, new UserProfile());

            userProfile.transaction = step.values.transaction;
            userProfile.name = step.values.name;
            userProfile.phoneNumber = step.values.phoneNumber;
            userProfile.email = step.values.email;
            userProfile.property = step.values.property;
            userProfile.price = step.values.price;
            userProfile.duration = step.values.duration;

            const msg = `Thank you for choosing Alfar ${ userProfile.name } \n
            Looks like we are done. Check out more properties here`;

            await step.context.sendActivity(msg);
        } else {
            await step.context.sendActivity('Thanks. Feel free to talk to us again');
        }

        return await step.endDialog();
    }
}

module.exports.SellingDialog = SellingDialog;
module.exports.SELLING_DIALOG = SELLING_DIALOG;
