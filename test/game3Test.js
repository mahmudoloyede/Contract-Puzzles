const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer };
  }

  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage
    const caller1 = ethers.provider.getSigner(1);
    const caller2 = ethers.provider.getSigner(2);

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: '1' });
    await game.connect(caller1).buy({ value: '2' });
    await game.connect(caller2).buy({ value: '3' });
    
    const address1 = await caller1.getAddress();
    const address2 = await caller2.getAddress();
    const address3 = await signer.getAddress();

    // TODO: win expects three arguments
    await game.win(address1, address2, address3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
