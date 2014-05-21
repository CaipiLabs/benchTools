/**
 * @author Nathanaël Debienassis
 */

var benchTools = {
    log : [],
    benchs : {},
    /**
     * Start ( totalTests ) independent benchs with ( totalSamples ) iterations of ( fn )
     * gc() need to be available to get memory results ( see readme )
     * 
     * results are sent to the console
     */
    goBenchThat : function (fn, totalTests, totalSamples, doAfter){
        var i, z=-1,
            gc = window.gc || 0,
            testedFn;

        var moys = {A : [], S : [], Amem : [], Smem : []};

        totalTests = totalTests || 1000;
        totalSamples = totalSamples || 10;
        //<debug>
        console.warn("Starting "+totalSamples+" sample of "+totalTests+" trys", fn);
        //</debug>
        for ( i = 0 ; i < totalSamples ; i++ ) {

            gc && gc();
            setTimeout(function () {
                var keep = [], i, tm = Date.now(), tmp, mem = gc && window.performance.memory.usedJSHeapSize, used, cleaned;

                gc && gc();
                for ( i = 0 ; i < totalTests ; i++ ) {
                    fn(i);
                }

                moys.A.push(tm = Date.now() - tm);
                if (gc){
                    used = window.performance.memory.usedJSHeapSize-mem;
                    gc();
                    cleaned = Math.round( (used-(window.performance.memory.usedJSHeapSize-mem))/(1024*1024) *100 ) / 100;
                    used = Math.round( used/(1024*1024) *100 ) / 100;
                    moys.Amem.push([used, cleaned]);
                }
                //<debug>
                console.info("Samples "+(++z)+" : " + tm + 'ms: mem delta : '+used+'Mo; \nAfter collect : '+(used-cleaned)+'Mo\n '+(100*cleaned/used)+' % cleaned');//( '+tmp.getFullAddress()+' )
                //</debug>
            });
        }


        setTimeout(function () {

            var mA = 0, mS = 0, memA=0, memReal=0, memGC=0;
            moys.A.map(function ( v ) {
                mA += v;
            });
            gc && moys.Amem.map(function ( v ) {
                memA += v[0];
                memGC += v[1];
                memReal += (v[0]-v[1])
            });
            //<debug>
            console.warn("Bench average results : \n " + (mA / moys.A.length) + "ms run time,\n" + (memReal / moys.A.length) + "Mo really used memory,\n and " + (memA / moys.A.length) + "Mo used memory before gc() ("+(100*(memGC/memA))+' % garbage collected\n In ' + moys.A.length + " records");
            //</debug>
            doAfter && setTimeout(doAfter,1);
        },500);
    }
}, bt = benchTools;
