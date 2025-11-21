<div class="wrapper">
        <div class="table">
                <a href="#" class="show-sidebar show"><i class="fa fa-arrow-right"></i></a>
    
    {if $cap_site_key}
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    {/if}

    <form method="post" action="submit" class="editor-form" id="frmSubmit">
        <div class="sidebar">
            <a href="home/">
<pre>
  ____            _     _       
 |  _ \  _____  _| |__ (_)_ __  
 | | | |/ _ \ \/ / '_ \| | '_ \ 
 | |_| | (_) >  <| |_) | | | | |
 |____/ \___/_/\_\_.__/|_|_| |_|
                                
</pre>
            </a>

            <div class="options">         
                <p style="color:red;">REMINDER: This is a test-run, expect bugs.</p>
       
                                
                <h3>Title:</h3>
                <input type="text" name="doxTitle" maxlength="70" value="" required>
            </div>

            {if $cap_site_key}
            <div class="options">
                <div data-sitekey="{$cap_site_key}" class="g-recaptcha"></div>
            </div>
            {/if}

            <div class="options">
                <ul>
                    <li><input type="submit" id="submitBtn" value="Save (CMD+S)" class="button"></li>
                    <li><input type="reset" value="Clear" class="button"></li>
                </ul>
            </div>
            <p>Please note that all posted information is publicly available and must follow our <a href="tos/" style="text-decoration: underline;">TOS.</a></p>
        </div>

        <div class="editor-container">
    <textarea name="dox" class="editor mousetrap" wrap="off" required></textarea>
</div>

    </form>
        </div>
    </div>

    <script src="legacy/jquery.min.js"></script>
    <script src="legacy/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="legacy/mousetrap.min.js"></script>
    <script src="legacy/google-code-prettify/prettify.js"></script>
    <script src="legacy/tabby.js"></script>
    <script src="legacy/zclip.min.js"></script>
    <script src="legacy/toastr/toastr.min.js"></script>
    <script src="legacy/bin.js"></script>
</body>
</html>
