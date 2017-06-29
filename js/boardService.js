'use strict';

angular
  .module('fireideaz')
  .service('BoardService', ['FirebaseService', 'Utils', function (firebaseService, utils) {

    var createBoard = function (userData, userId, newBoard, boardCreationCallback) {
        var board = firebaseService.getBoardRef(userId);
        board.set({
          boardId: newBoard.name,
          date_created: new Date().toString(),
          columns: $scope.messageTypes,
          user_id: userData.uid,
          max_votes: newBoard.max_votes || 6
        }, boardCreationCallback);
      },
      addColumns = function (userId, columns) {
        var boardColumns = firebaseService.getBoardColumns(userId);
        boardColumns.set(columns);
      },
      getBoard = function (userId) {
        return firebaseService.getBoardRef(userId);
      },
      addColumn = function (name, board, userId) {
        board.columns.push({
          value: name,
          id: utils.getNextId(board)
        });

        addColumns(userId, utils.toObject(board.columns));
      };


    return {
      createBoard: createBoard,
      getBoard: getBoard,
      addColumn: addColumn
    };

  }]);