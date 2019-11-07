const {
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');

const { AttachmentLayoutTypes, CardFactory } = require('botbuilder');
// const { UserProfile } = require('../userProfile');
const inputCard = require('../resources/inputForm.json');

const BUYING_DIALOG = 'BUYING_DIALOG';

const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
// const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const TEXT_PROMPT = 'TEXT_PROMPT';

class BuyingDialog extends ComponentDialog {
    constructor(userState) {
        super(BUYING_DIALOG);

        // this.userProfile = userState.createProperty(USER_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.propertyStep.bind(this),
            this.priceStep.bind(this),
            this.locationStep.bind(this),
            this.durationStep.bind(this),
            this.morgageStep.bind(this),
            this.morgageConfirmStep.bind(this),
            this.sampleProperties.bind(this),
            this.userInfoStep.bind(this)
            // this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     * */

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
    */

    async propertyStep(stepContext) {
        stepContext.values.transaction = stepContext.result;
        console.log(stepContext.result);

        return await stepContext.prompt(CHOICE_PROMPT, {
            prompt: 'We have a number of properties. Choose the type of property you would like to buy',
            choices: ChoiceFactory.toChoices(['House', 'Apartments', 'Land'])
        });
    }

    async priceStep(stepContext) {
        console.log(stepContext.result);
        stepContext.values.property = stepContext.result;

        return await stepContext.prompt(CHOICE_PROMPT, {
            prompt: 'Okay, what is your rough budget?',
            choices: ChoiceFactory.toChoices(['500,000 - 1M', '1M - 3M', '3M - 5M', '5M - 10M', '>10M'])
        });
    }

    async locationStep(step) {
        step.values.price = step.result;

        await step.context.sendActivity('Good choice. I need to know more.');

        const promptOptions = { prompt: 'Please enter your preffered neighbourhood.' };

        // Ask the user to enter their age
        return await step.prompt(TEXT_PROMPT, promptOptions);
    }

    async durationStep(step) {
        step.values.location = step.result;

        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'Kindly select the duration you would like to complete your purchase',
            choices: ChoiceFactory.toChoices(['ASAP', '45 - 90 days', '3 - 6 months'])
        });
    }

    async morgageStep(step) {
        step.values.duration = step.result;
        await step.context.sendActivity('We help our customers with morgage.');

        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'Would you like morgage help?',
            choices: ChoiceFactory.toChoices(['YES', 'NO'])
        });
    }

    async morgageConfirmStep(step) {
        step.values.morgageChoice = step.result;
        console.log(step.result);

        let morgageToRun;

        switch (step.result.value) {
        case 'YES':
            await step.context.sendActivity('Alright, Kindly fill in with information to help us contact you.');
            morgageToRun = ({ attachments: [this.infoAdaptiveCard()] });
            break;
        case 'NO':
            await step.context.sendActivity('Cool, just checking \n Kindly leave your contacts. We will get back to you soon');
            morgageToRun = ({ attachments: [this.infoAdaptiveCard()] });
            break;
        default:
            break;
        };

        if (morgageToRun !== undefined) {
            return await step.context.sendActivity(morgageToRun);
        }
    }

    async sampleProperties(step) {
        // console.log('BuyingDialog.sampleProperties');

        // Create the PromptOptions which contain the prompt and re-prompt messages
        await step.context.sendActivity('Check out  a few sample properties for you');
        await step.context.sendActivity({
            attachments: this.propChoices(),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
        const viewMore = 'You can view more properties here';
        return await step.context.sendActivity(viewMore);
    }

    async userInfoStep(step) {
        await step.context.sendActivity('Finally, Help us with a some info to help us contact you.');
        return await step.context.sendActivity({ attachments: [this.infoAdaptiveCard()] });
    }

    /**
    async phonenoStep(step) {
        step.values.duration = step.result.value;

        return await step.prompt(NUMBER_PROMPT, {
            prompt: 'Kindly help us with your number so that we can contact you.'
        });
    }

    async emailStep(step) {
        step.values.phoneNumber = step.result.value;

        await step.context.sendActivity('One of our agents will be in contact with you soon');

        return await step.prompt(TEXT_PROMPT, {
            prompt: 'Help us with your email address. We will email you potential properties before being publicly listed'
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

            const msg = `Thank you for choosing Alfar ${ userProfile.name }`;

            await step.context.sendActivity(msg);
        } else {
            await step.context.sendActivity('Thanks. Feel free to visit Alfar again');
        }

        return await step.endDialog();
    }
    */

    infoAdaptiveCard() {
        return CardFactory.adaptiveCard(inputCard);
    }

    propChoices() {
        const propChoices = [
            CardFactory.heroCard(
                'Property 1',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'openUrl',
                        title: 'Flat Karen',
                        value: 'https://docs.microsoft.com/en-us/azure/bot-service/2'
                    }
                ])
            ),

            CardFactory.heroCard(
                'Property 2',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'openUrl',
                        title: '3 br Kilimani',
                        value: 'https://docs.microsoft.com/en-us/azure/bot-service/2'
                    }
                ])
            ),

            CardFactory.heroCard(
                'Property 3',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'openUrl',
                        title: '2 br Kileleshwa',
                        value: 'https://docs.microsoft.com/en-us/azure/bot-service/2'
                    }
                ])
            ),

            CardFactory.heroCard(
                'Property 4',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'openUrl',
                        title: '3 br Kilimani',
                        value: 'https://docs.microsoft.com/en-us/azure/bot-service/2'
                    }
                ])
            )
        ];

        return propChoices;
    }
}

module.exports.BuyingDialog = BuyingDialog;
module.exports.BUYING_DIALOG = BUYING_DIALOG;
