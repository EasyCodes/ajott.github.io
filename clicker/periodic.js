window.setInterval(function(){


    getMoney(workers[1]);
    getMoney(workers[2]*8);
	getMoney(workers[3]*47);
	getMoney(workers[4]*260);
    getMoney(workers[5]*1400);

	checkLabor(workers[0]);
  
	
}, 1000);

window.setInterval(function(){
    
    investInterest();
    updateMPS();
    // getMoney(workers[0]);
    checkTotalInterest();
    
}, 10000);