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
            gc && gc();
            setTimeout(function () {
                gc && gc();
                var keep = [], i, tm = Date.now(), tmp, mem = gc && window.performance.memory.usedJSHeapSize, v;

                for ( i = 0 ; i < totalTests ; i++ ) {
                    fn(i);
                }

                moys.A.push(tm = Date.now() - tm);
                gc && moys.Amem.push(v = Math.round( (window.performance.memory.usedJSHeapSize-mem)/(1024*1024) *100 ) / 100);
                //<debug>
                console.info("Samples "+(++z)+" : " + tm + 'ms, mem delta : '+v+'Mo');//( '+tmp.getFullAddress()+' )
                //</debug>
            });
        }


        setTimeout(function () {

            var mA = 0, mS = 0, memA=0, memS=0;
            moys.A.map(function ( v ) {
                mA += v;
            });
            gc && moys.Amem.map(function ( v ) {
                memA += v;
            });
            //<debug>
            console.warn("Bench result : " + (mA / moys.A.length) + "ms / " + (memA / moys.A.length) + "Mo in " + moys.A.length + " records");
            //</debug>

        },500);
    }
}, bt = benchTools;
