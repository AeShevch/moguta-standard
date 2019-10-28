
<?php echo !empty($data['msgError']) ? '<div class="l-col min-0--12"><div class="c-alert c-alert--red">' . $data['msgError'] . '</div></div>' : '' ?>
<div class="l-col min-0--12">
    <form class="c-form c-form--width" action="<?php echo SITE ?>/enter" method="POST">
        <div class="c-form__row">
            <input type="text" name="email" placeholder="Email"
                   value="<?php echo !empty($_POST['email']) ? $_POST['email'] : '' ?>" required>
        </div>
        <div class="c-form__row">
            <input type="password" name="pass" placeholder="<?php echo lang('enterPass'); ?>" required>
        </div>

        <?php echo !empty($data['checkCapcha']) ? $data['checkCapcha'] : '' ?>
        <?php if (!empty($_REQUEST['location'])) : ?>
            <input type="hidden" name="location" value="<?php echo $_REQUEST['location']; ?>"/>
        <?php endif; ?>
        <div class="c-form__row">
            <button type="submit" class="c-button"><?php echo lang('enterEnter'); ?></button>
            <a class="c-button c-button--link"
               href="<?php echo SITE ?>/forgotpass"><?php echo lang('enterForgot'); ?></a>
        </div>
        <div class="c-form__row c-form__row--line">
            <a class="c-button c-button--border"
               href="<?php echo SITE ?>/registration"><?php echo lang('enterRegister'); ?></a>
        </div>
    </form>
</div>