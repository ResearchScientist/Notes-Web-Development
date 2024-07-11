# Debug Cycle

- identify
- isolate
- resolve
- prevent

**Identify**

The sooner the better.
Find bug during
- development
- testing
- site monitoring
- user reporting

**Isolate**

What context does the bug exist in.
- which browsers
- what pages
- which users
- what scripts

What state does it occur in.
- browser
- DOM
- JS
- API

Use context and recreate state to find root cause.

**Resolve**

Discuss the associated risks, changes, and impacts in implementing an immediate unstable fix vs a later stable fix.

**Prevent**

Steps to prevent bug from occurring again.

Process Change
Automate a manual process.

Regression Test
Test that looks for a recurrence of a bug.

# Chrome Debbugger Tool

Preserve Log
Keeps logs after any state changes.

Async
Tracks asynchronous calls between functions.

Blackbox Script
Right click on a file you do not want to show in the debugger , click blackbox script.
Useful for decluttering console view by not including imported libraries during debugging.
Not included files are grayed out.

**Application Tab**

Shows web app info such as
- manifest
- service workers
- local storage
- cache

**Network Tab**

For viewing server status codes.

**Profiles Tab**

For viewing memory allocation.

Record Allocation Timeline
Helps troubleshoot memory leaks. Record for about 30s.
Blue bars indicate memory used and retained.
Expected behaviour is that long blue lines are followed by short blue lines to indicate memory is being released back.

Save profile to show snapshot of site performance at various points throughout development cycle.

**Timeline Tab**

For displaying FPS.
For identifying memory leaks.

Record memory while interacting with the site for about 30s.

Top section shows FPS,CPU,HEAP
Select area around blue line.

Second section shows more detail with waterfall view.
`w` zoom in
`s` zoom out
`a` move left
`d` move right

# Bug Types

**Logical**

- event Prevent Default
When preventing any default behaviour make sure to provide alternate behaviour.

- empty string
Consider if an empty string is a valid value for your function.

**Data**

- form validation
Make sure to only allow valid requests.
Do not submit an empty form. Have JS validate input as string and non empty. Add a required attribute to the html element for user feedback.

- invalid datatypes
Server may send an unexpected data type.
Write code to catch these edge occurrences.

**Memory**

- unreleased objects

**Performance**

- assets that block flow
Combine multiple files into one file to reduce multiple call requests.

- uncompressed assets
Minify and gzip files such as css and js.
Compress images and use correct resolution sizes.

**Network**

- bad connection strength
Can lead to missing assets or dropped data.
Best to have a catch for that scenario and provide the user with a message informing them of what may have happened and offer some options.

- active blocking
JS can be turned off.
Inform the user.

**Third Party Errors**

- libraries can change and not update correctly
You can send them a bug fix report.
Best to make a copy of the library and package it locally.

# Preventative Development

- keep core code inhouse
Avoid use of third party code for critical infrastructure.

- write modular code
This allows for more effective unit testing.

- maintain a debugging log
This tracks types of bugs and their location. Which helps identify modules or systems that require restructuring.

# Tips

Have a user account in order to interact with the site as an actual user.
