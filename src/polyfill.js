
/*
 * Since webpack does not handle polyfills anymore,
 * we have to do this ourself. The acceptes solutions on stackoverflow
 * are not to my taste. Let's keep things simple.
 */

import url        from 'url';
import process    from 'process';
import { Buffer } from 'buffer';


window.Buffer = window.Buffer || Buffer;
window.process = window.process || process;
window.url = window.url || url;

