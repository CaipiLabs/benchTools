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
    goBenchThat : function (fn, totalTests, totalSamples){
        var i, z=-1,
            gc = window.gc || 0;

        var moys = {A : [], S : [], Amem : [], Smem : []};

        totalTests = totalTests || 1000;
        totalSamples = totalSamples || 10;
        //<debug>
        console.warn("Starting "+totalSamples+" sample of "+totalTests+" trys", fn);
        //</debug>
        for ( i = 0 ; i < totalSamples ; i++ ) {
            
            setTimeout(function () {
                gc && gc();
                var keep = [], i, tm = Date.now(), tmp, mem = gc && window.performance.memory.usedJSHeapSize, used, cleaned;

                for ( i = 0 ; i < totalTests ; i++ ) {
                    fn(i);
                }

                moys.A.push(tm = Date.now() - tm);
                if (gc){
                    used = Math.round( (window.performance.memory.usedJSHeapSize-mem)/(1024*1024) *100 ) / 100;
                    gc();
                    cleaned = Math.round( (used-window.performance.memory.usedJSHeapSize)/(1024*1024) *100 ) / 100;
                    moys.Amem.push([used, cleaned]);
                }
                //<debug>
                console.info("Samples "+(++z)+" : " + tm + 'ms, mem delta : '+(used-cleaned)+'Mo; '+cleaned+'Mo taken by garbage collect');//( '+tmp.getFullAddress()+' )
                //</debug>
            });
        }


        setTimeout(function () {

            var mA = 0, mS = 0, memA=0, memS=0, memGC=0;
            moys.A.map(function ( v ) {
                mA += v;
            });
            gc && moys.Amem.map(function ( v ) {
                memA += v[0];
                memGC += v[1];
            });
            //<debug>
            console.warn("Bench result : " + (mA / moys.A.length) + "ms / " + (memA / moys.A.length) + "Mo in " + moys.A.length + " records\n "+(100*(memA/memGC))+' % garbage collected');
            //</debug>

        },500);
    }
}, bt = benchTools;
