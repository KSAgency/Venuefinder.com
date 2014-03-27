function endActInd(curWin, spinView, actInd){

    curWin.remove(spinView);
    spinView.remove(actInd);
    actInd.hide();
    curWin.setTouchEnabled(true);

    return spinView;

}

module.exports = endActInd;
