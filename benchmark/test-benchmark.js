function bench(iterations) {

    function benchmark(func, iterations) {
        var results = [];
        for (var i = 0; i < iterations; i++) {
            var start = performance.now();
            func();
            results.push((performance.now() - start).toFixed(0));
        }
        return results;
    }

    function takBenchmark(iterations) {
        return benchmark(
            function () {
                function tak(x, y, z) {
                    return (x <= y) ? y : tak(tak(x - 1, y, z), tak(y - 1, z, x), tak(z - 1, x, y));
                }
                tak(17, 11, 6);
            }, iterations);
    }

    return takBenchmark(iterations);
}

console.log(bench(100))
