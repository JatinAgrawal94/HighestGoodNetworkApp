import React from 'react';
import './BlueSquare.css';
import hasPermission from 'utils/permissions';
import { connect, useSelector } from 'react-redux';
import { formatCreatedDate, formatDate } from 'utils/formatDate';
import { formatDateFromDescriptionString,formatTimeOffRequests } from 'utils/formatDateFromDescriptionString';

const BlueSquare = (props) => {
  const authRole = useSelector(state => state.auth.user.role)
  
  const isInfringementAuthorizer = props.hasPermission('infringementAuthorizer');
  const canPutUserProfileImportantInfo = props.hasPermission('putUserProfileImportantInfo');
  const { blueSquares, handleBlueSquare} = props;

  return (
    <div className="blueSquareContainer">
      <div className="blueSquares">
        {blueSquares
          ? blueSquares
              .sort((a, b) => (a.date > b.date ? 1 : -1))
              .map((blueSquare, index) => (
                <div
                  key={index}
                  role="button"
                  id="wrapper"
                  data-testid="blueSquare"
                  className="blueSquareButton"
                  onClick={() => {
                    if (!blueSquare._id) {
                      handleBlueSquare(isInfringementAuthorizer, 'message', 'none');
                    } else if (canPutUserProfileImportantInfo) {
                      handleBlueSquare(
                        canPutUserProfileImportantInfo,
                        'modBlueSquare',
                        blueSquare._id,
                      );
                    } else {
                      handleBlueSquare(
                        !canPutUserProfileImportantInfo,
                        'viewBlueSquare',
                        blueSquare._id,
                      );
                    }
                  }}
                >
                  <div className="report" data-testid="report">
                    <div className="title">{formatDate(blueSquare.date)}</div>
                    {blueSquare.description !== undefined && 
                      <div className="summary">{(() => {
                        const dateFormattedDescription = formatDateFromDescriptionString(blueSquare.description);
                        const formattedDescription = formatTimeOffRequests(dateFormattedDescription);
                
                        if (formattedDescription.length > 0) {
                          return (
                            <>
                            <span>{blueSquare.createdDate !== undefined ? formatCreatedDate(BlueSquare.createdDate)+":"  : null}</span>
                            <span>
                              {formattedDescription[0]}
                              <br />
                              <span style={{ fontWeight: 'bold' }}>Notice :</span>
                              <span style={{ fontStyle: "italic", textDecoration: "underline" }}>{`${formattedDescription[1]}`}</span>
                            </span>
                            </>
                          );
                        } else {
                          return blueSquare.createdDate !== undefined ? formatCreatedDate(BlueSquare.createdDate)+": "+dateFormattedDescription  : dateFormattedDescription
                        }
                      })()}</div>
                    }
                  </div>
                </div>
              ))
          : null}
      </div>
      {isInfringementAuthorizer && ( 
        <div
          onClick={() => {
            handleBlueSquare(true, 'addBlueSquare', '');
          }}
          className="blueSquareButton"
          color="primary"
          data-testid="addBlueSquare"
        >
          +
        </div>
      )}
      <br />
    </div>
  );
};

export default connect(null, { hasPermission })(BlueSquare);
