const { AttachmentLayoutTypes, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog } = require('botbuilder-dialogs');

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class MainDialog extends ComponentDialog {
    constructor() {
        super('MainDialog');

        // Define the man dialog and its related components
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.showProductChoicesStep.bind(this),
            this.showCardSelectionStep.bind(this)
        ]));

        // The initial child dialog to run
        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    /**
     * Send a carousel of HeroCards for the user to pick from.
     * @param {WaterfallStepContext} stepContext
     */
    async showProductChoicesStep(stepContext) {
        console.log('MainDialog.showProductChoicesStep');

        await stepContext.context.sendActivity({
            attachments: this.productChoices(),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
        return { status: DialogTurnStatus };
    }

    async showCardSelectionStep(stepContext) {
        console.log('Maindialog.showCardSelectionStep');

        await stepContext.context.sendActivity('You picked ' + stepContext.context.activity.value);

        // Give the user instructions about what to do next
        await stepContext.context.sendActivity('Type anything to see another card');

        return await stepContext.endDialog();
    }

    // Helper functions used to create cards
    productChoices() {
        const productSeriesOptions = [
            CardFactory.heroCard(
                'Product 1',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'messageBack',
                        title: 'Pick Me',
                        value: 'product1'
                    }
                ])
            ),

            CardFactory.heroCard(
                'Product 2',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'messageBack',
                        title: 'Pick Me',
                        value: 'product2'
                    }
                ])
            ),

            CardFactory.heroCard(
                'Product 3',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'messageBack',
                        title: 'Pick Me',
                        value: 'product3'
                    }
                ])
            ),

            CardFactory.heroCard(
                'Product 4',
                CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
                CardFactory.actions([
                    {
                        type: 'messageBack',
                        title: 'Pick Me',
                        value: 'product4'
                    }
                ])
            )

        ];

        return productSeriesOptions;
    }
}

module.exports.MainDialog = MainDialog;
