export function waitlistPage(name='Hollow Universe'){return `<main id="main" class="waitlist-main">
  
  <section class="waitlist-layout">
    <div class="waitlist-intro"><p class="eyebrow"><span class="signal-dot"></span> YOUR NEXT FRONTIER</p><h1>One rock.<br><em>One torch.</em><br>Your next world.</h1><p>From the first foothold to a home among the stars. Join the waitlist for ${name} playtest news and launch updates.</p><div class="waitlist-total"><span class="signal-dot"></span><strong data-waitlist-count>…</strong><span>on the waitlist</span></div><a class="cinema-secondary" href="#signup">Join the waitlist <span aria-hidden="true">↓</span></a></div>
    <figure class="waitlist-art"><img src="/assets/orbital-flight-layout.webp" alt="The Iron Wake and Tin Finch above a sunlit planet" width="1672" height="941" fetchpriority="high"></figure>
    <div class="waitlist-card" id="signup">
      <div data-signup-panel><p class="eyebrow">GET ON THE LIST</p><h2>Your story starts here.</h2><p class="waitlist-subtitle">A name, an email, and a world to look forward to.</p>
        <form id="waitlist-form"><label for="waitlist-name">Name or callsign</label><input id="waitlist-name" name="name" autocomplete="name" maxlength="80" required placeholder="What should we call you?">
        <label for="waitlist-email">Email address</label><input id="waitlist-email" name="email" type="email" autocomplete="email" maxlength="254" required placeholder="you@example.com">
        <label for="waitlist-playstyle">How will you make your way? <span>Optional</span></label><select id="waitlist-playstyle" name="playstyle"><option value="">Choose your playstyle</option><option value="solo">Solo survivor</option><option value="crew">With a crew</option><option value="nomad">Roaming ship captain</option><option value="undecided">I’ll find out there</option></select>
        <div class="waitlist-trap" aria-hidden="true"><label for="waitlist-website">Website</label><input id="waitlist-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="waitlist-consent"><input type="checkbox" name="consent" required><span>Send me ${name} playtest and launch updates by email.</span></label>
        <button type="submit" class="cinema-button">Join the waitlist <span aria-hidden="true">↗</span></button><p class="waitlist-status" data-waitlist-status role="status" aria-live="polite"></p>
        </form><details class="waitlist-privacy"><summary>Your details stay private.</summary><p>We store your name, email and optional playstyle with Cloudflare to manage ${name}’s waitlist and send the updates you requested. Your details are never displayed publicly or sold. Leave using your removal link after signup or the unsubscribe link included in future emails.</p></details><noscript><p>Please enable JavaScript to join the waitlist.</p></noscript>
      </div>
      <section data-signup-success hidden tabindex="-1"><span class="waitlist-success-icon" aria-hidden="true">✓</span><p class="eyebrow">YOU’RE ON THE LIST</p><h2>See you<br>on the frontier.</h2><p>We’ll be in touch with ${name} playtest news and launch updates.</p><a class="cinema-button" href="/about/">Explore your next home <span aria-hidden="true">↗</span></a><p class="waitlist-manage" data-removal-note hidden>Keep this private link if you want to <a data-removal-link href="/waitlist/">leave the waitlist</a> later. Future emails will include an unsubscribe link too.</p></section>
      <section data-leave-panel hidden><p class="eyebrow">YOUR WAITLIST</p><h2>Leaving the frontier?</h2><p>Remove your signup and stop future waitlist updates. You can join again whenever you like.</p><button class="cinema-button" type="button" data-leave-waitlist>Leave the waitlist <span aria-hidden="true">↗</span></button><p class="waitlist-status" data-leave-status role="status" aria-live="polite"></p><a class="cinema-secondary" href="/">Back to ${name}</a></section>
    </div>
  </section>
</main>`;}
