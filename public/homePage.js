const logoutButton = new LogoutButton();

logoutButton.action = function(){
    ApiConnector.logout(f => location.reload());   
}

ApiConnector.current((response) => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
}
)
const ratesBoard = new RatesBoard();
 
ratesBoard.getCurrent = function(){
    ApiConnector.getStocks(
        (response) => {
            if(response.success){
              this.clearTable();
              this.fillTable(response.data); 
            }
        }
    );
}
setInterval(() => ratesBoard.getCurrent(), 10000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data){
    ApiConnector.addMoney(
        data,
        (response) => {
            if(response.success){
                ProfileWidget.showProfile(response.data);
                this.setMessage(response.success, 'Успешно пополнен баланс');
            }else{
                this.setMessage(response.success, 'Ошибка пополнения баланса');
            }
        }
    );
}

moneyManager.conversionMoneyCallback = function(data){
    ApiConnector.convertMoney(
        data,
        (response) => {
            if(response.success){
                ProfileWidget.showProfile(response.data);
                this.setMessage(response.success, 'Успешно конвертирована валюта');
            }else{
                this.setMessage(response.success, 'Ошибка конвертации валюты');
            }  
        }
    )
}

moneyManager.sendMoneyCallback = function(data){
    ApiConnector.transferMoney(
        data,
        (response) => {
            if(response.success){
                ProfileWidget.showProfile(response.data);
                this.setMessage(response.success, 'Перевод средств совершен');
            }else{
                this.setMessage(response.success, 'Не удалось совершить перевод средств');
            }  
        }
    )
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(
    (response) => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    }
)
favoritesWidget.addUserCallback = function(data){
    ApiConnector.addUserToFavorites(
        data,
        (response) =>{
            if(response.success){
                this.clearTable();
                this.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                this.setMessage(response.success, "Пользователь добавлен");
            } else {
                this.setMessage(response.success, "Не удалось добавить пользователя");
            }
        }
    )
}
favoritesWidget.removeUserCallback = function(data){
    ApiConnector.removeUserFromFavorites(
        data,
        (response) => {
            if(response.success){
                this.clearTable();
                this.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                this.setMessage(response.success, "Пользователь удален");
            }else{
                this.setMessage(response.success, "Не удалось удалить пользователя");
            }
        }
    )
}