/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  UniswapV3FactoryContract,
  UniswapV3Factory_PoolCreatedEntity,
  UniswapV3PoolContract,
  UniswapV3Pool_SwapEntity,
} from "generated";

UniswapV3FactoryContract.PoolCreated.loader(({ event, context }) => {
  context.contractRegistration.addUniswapV3Pool(event.params.pool);
});

UniswapV3FactoryContract.PoolCreated.handler(({ event, context }) => {
  const uniswapV3Factory_PoolCreatedEntity: UniswapV3Factory_PoolCreatedEntity =
    {
      id: event.transactionHash + event.logIndex.toString(),
      token0: event.params.token0,
      token1: event.params.token1,
      fee: event.params.fee,
      tickSpacing: event.params.tickSpacing,
      pool: event.params.pool,
    };

  context.UniswapV3Factory_PoolCreated.set(uniswapV3Factory_PoolCreatedEntity);
});
UniswapV3PoolContract.Swap.loader(({ event, context }) => {});

UniswapV3PoolContract.Swap.handler(({ event, context }) => {
  const uniswapV3Pool_SwapEntity: UniswapV3Pool_SwapEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    recipient: event.params.recipient,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    sqrtPriceX96: event.params.sqrtPriceX96,
    liquidity: event.params.liquidity,
    tick: event.params.tick,
  };

  context.UniswapV3Pool_Swap.set(uniswapV3Pool_SwapEntity);
});
