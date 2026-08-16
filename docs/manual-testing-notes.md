# Testing Notes - Login + Team Page

Tested by: Falah (Task 2 Dev/Tester)
Tested on: https://group75-robocup.vercel.app

## Card 1 - Edge Cases & Bugs

Invalid login - wrong password
Steps: went to /login, entered a real email with the wrong password, clicked login
Result: error shown top right "invalid email or password"

Invalid login - non-existent email
Steps: went to /login, entered an email that doesn't exist as an account, entered any password, clicked login
Result: same error shown top right "invalid email or password"

Empty fields
Steps: went to /login, left email blank and submitted
Result: error shown under the email box

Steps: went to /login, left password blank and submitted
Result: error shown under the password box - "password is required"

Steps: went to /login, left both email and password blank and submitted
Result: both errors shown at once, under each respective box, plus the top right "invalid email or password" toast also pops up on submit either way

Direct team-page access without login
Steps: logged out, manually typed the team page url into the browser
Result: redirects to login properly

Missing photo
No one's missing a photo right now so couldn't test that one.

Long blurb
Tested with a short blurb first (wraps/displays fine), then tested with a longer blurb once someone updated theirs - wraps onto the next line properly, displays fine, no overflow or layout issues.

No bugs found otherwise.

## Card 2 - Login -> Redirect -> Team Page Flow

Valid login
Steps: went to /login, entered a working test account's email and password, clicked login
Result: logged in first try, redirects to team page automatically after

Team page content
Everyone's photo/name/role showing correctly on the team page.

Only thing missing is the blurb text - see note above, doesn't look like it's built yet.
