const assert = require('assert');
const Botmock = require('botkit-mock');
const myController = require("./indexController");

describe("controller tests", () => {
  beforeEach(() => {
    this.controller = Botmock({});
    // type can be ‘slack’, facebook’, or null
    this.bot = this.controller.spawn({ type: 'slack' });
    myController(this.controller);
  });

  it('should return uri text`', () => {
    return this.bot.usersInput(
      [
        {
          user: 'someUserId',
          channel: 'someChannel',
          messages: [
            {
              text: '\\\\myFileServer\\tests', isAssertion: true, _pipeline: { stage: 'receive' }
            }
          ]
        }
      ]
    ).then((message) => {
      // In message, we receive a full object that includes params:
      // {
      //    user: 'someUserId',
      //    channel: 'someChannel',
      //    text: 'help message',
      // }
      return assert.equal(message.text, `
file://myFileServer/tests
smb://myFileServer/tests`);
    })
  });
});
