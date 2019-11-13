export function scrollToElm(container, elm){
    var pos = getRelativePos(elm);
    scrollTo( container, pos.top - 20 , 0.5);  // duration in seconds
}

function getRelativePos(elm){
    if (!elm.parentNode) {
        return;
    }
    var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
        cPos = elm.getBoundingClientRect(), // target pos
        pos = {};

    pos.top    = cPos.top    - pPos.top + elm.parentNode.scrollTop,
        pos.right  = cPos.right  - pPos.right,
        pos.bottom = cPos.bottom - pPos.bottom,
        pos.left   = cPos.left   - pPos.left;

    return pos;
}

function scrollTo(element, to, duration) {
    if (!element) {
        return;
    }
    var start = element.scrollTop,
        change = to - start,
        startTime = performance.now(),
        val, now, elapsed, t;

    function animateScroll(){
        now = performance.now();
        elapsed = (now - startTime)/1000;
        t = (elapsed/duration);

        element.scrollTop = start + change * easeInOutQuad(t);

        if( t < 1 )
            window.requestAnimationFrame(animateScroll);
    };

    animateScroll();
}

function easeInOutQuad(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t };