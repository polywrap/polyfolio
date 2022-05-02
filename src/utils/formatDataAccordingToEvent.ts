import _forEach from 'lodash/forEach';
import {findTokenName, getEventIcon, getEventType, getTokenAmount, getTokenPrice} from './dataFormatting';

export const formatDataAccordingToEvent = (transaction, user: string, assets) => {
  let eventData = null;
  let eventName: string;
  let icon: string;
  let tokenTicker: string;
  let tokenAmount: string;
  let tokenPrice: number | string;
  
  if (transaction) {
    if (transaction.logs.length > 0) {
      _forEach(transaction.logs, (log) => {
        eventName = log.event.name;
        const eventParams = log.event.params;

        switch (eventName) {
          case 'Approval':
            icon = getEventIcon(eventName);
            tokenTicker = findTokenName(assets, log.contractAddress);
            tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
            tokenPrice = getTokenPrice(assets, tokenTicker);

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'Transfer':
            eventName = getEventType(eventName, user, eventParams);
            icon = getEventIcon(eventName);
            tokenTicker = findTokenName(assets, log.contractAddress);
            tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
            tokenPrice = getTokenPrice(assets, tokenTicker);

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'Swap':
            eventName = getEventType(eventName, user, eventParams);
            // change logic under
            icon = getEventIcon(eventName);
            tokenTicker = findTokenName(assets, log.contractAddress);
            tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
            tokenPrice = getTokenPrice(assets, tokenTicker);

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'Withdrawal':
            icon = '???';
            tokenTicker = '???';
            tokenAmount = '???';
            tokenPrice = '???';

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'Sync':
            icon = '???';
            tokenTicker = '???';
            tokenAmount = '???';
            tokenPrice = '???';

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'StateSynced':
            icon = '???';
            tokenTicker = '???';
            tokenAmount = '???';
            tokenPrice = '???';

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'NewDepositBlock':
            icon = '???';
            tokenTicker = '???';
            tokenAmount = '???';
            tokenPrice = '???';

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          case 'Deposit':
            icon = '???';
            tokenTicker = tokenTicker = findTokenName(assets, log.contractAddress);
            tokenAmount = getTokenAmount(eventParams[1].value, assets, tokenTicker);
            tokenPrice = getTokenPrice(assets, tokenTicker);

            eventData = {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            }
            break;
          default: eventData = null;
        }
      })
    }
  }

  return eventData;
}
