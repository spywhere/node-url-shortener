# Security

This document are intended to show what could be the security issues with
the design and implementation on this project, not including in the technology
used. The project itself are not intended to be use on production environment,
doing so could risk on various security issues that might not be included in
this document. Please be sure to perform an intensive testing before using
this project on the production environment, should you have to do it. USING
THIS PROJECT THAT YOUR OWN RISK. The author are not responsible for any issue
that could arise from using this code on your environment.

## Potential Vulnerablities

### URL Bruth force
Since URL is constructed as a simple, shorten string, this would be prone to
a bruth force attack as the attack can directly check by calling the redirect
endpoint one-by-one and discover all the valid links available.

### Sequential ID
Since Alias ID is constructed by using a character set, if the attacker have
an access or see a pattern in the ID, they could rebuild a new ID and try it
to see what is the link in the next sequence.

### Malicious link
Any attack could use this application to hide a malicious link that could be
sent to any user. If the user does not careful enough, they could get attack
through crafted links that the attackers created.

## Potential Solution

### Expiration
With expiration, this could solve 2 problems. One, a malicious link will be
expire eventually, causing the attack to be limited to certain period. Two,
this would help with ID collision as older ID will get expired and can be
reuse later on. However, a cooldown period would be recommended and the
consumer of the old link would take some time to adopt a new change.

### Rate limiting
Since most of the time, user would access the link just a few times per minute.
Making a rate limiting on accessing the site would help with a number of
bruth force attacks as it would take longer to wait for rate limit to expired.

### Private access
Some links that might contains sensitive information could be secured if an
access limit is set (could be a token or password). Also, make sure that
the link cannot be access directly without a permission.

### Limited API access via authentications / authorizations
With authentications and authorizations, we can identify the source of the
request and help prevent a bruth force or even malicious source of links as
authentication token could be link with the requested application.

### Preview mode
With preview mode, which show the target URL before actually redirect use to,
would help the user themselves know what will be behind the link, causing less
harm with malicious link.
