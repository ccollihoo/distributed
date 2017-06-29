'use strict';

angular
  .module('fireideaz')
  .service('BoardService', ['FirebaseService', function (firebaseService) {

    var createBoard = function (userData, userId, newBoard, boardCreationCallback) {
      var board = firebaseService.getBoardRef(userId);
      board.set({
        boardId: newBoard.name,
        date_created: new Date().toString(),
        columns: $scope.messageTypes,
        user_id: userData.uid,
        max_votes: newBoard.max_votes || 6
      }, boardCreationCallback);
    };

    var getBoard = function (userId) {
      return firebaseService.getBoardRef(userId);
    };

    var addColumns = function (userId, columns) {
      var boardColumns = firebaseService.getBoardColumns(userId);
      boardColumns.set(columns);
    };


    return {
      createBoard: createBoard,
      getBoard: getBoard,
      addColumns: addColumns
    };

  }]);