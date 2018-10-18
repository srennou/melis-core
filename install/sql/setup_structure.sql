-- MySQL Script generated by MySQL Workbench
-- Wed Oct 17 18:25:28 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema melisv2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `melis_core_lang`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_lang` ;

CREATE TABLE IF NOT EXISTS `melis_core_lang` (
  `lang_id` INT(11) NOT NULL AUTO_INCREMENT,
  `lang_locale` VARCHAR(10) NOT NULL DEFAULT 'en_EN',
  `lang_name` VARCHAR(45) NULL,
  PRIMARY KEY (`lang_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Languages available';


-- -----------------------------------------------------
-- Table `melis_core_platform`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_platform` ;

CREATE TABLE IF NOT EXISTS `melis_core_platform` (
  `plf_id` INT(11) NOT NULL AUTO_INCREMENT,
  `plf_name` VARCHAR(100) NOT NULL,
  `plf_update_marketplace` VARCHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`plf_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Defines environement used for the project';


-- -----------------------------------------------------
-- Table `melis_core_user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_user_role` ;

CREATE TABLE IF NOT EXISTS `melis_core_user_role` (
  `urole_id` INT(11) NOT NULL AUTO_INCREMENT,
  `urole_name` VARCHAR(255) NOT NULL,
  `urole_rights` TEXT NULL DEFAULT NULL,
  `urole_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`urole_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Melis Users\' roles';


-- -----------------------------------------------------
-- Table `melis_core_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_user` ;

CREATE TABLE IF NOT EXISTS `melis_core_user` (
  `usr_id` INT(11) NOT NULL AUTO_INCREMENT,
  `usr_status` INT(11) NOT NULL DEFAULT '1',
  `usr_login` VARCHAR(255) NOT NULL,
  `usr_email` VARCHAR(255) NOT NULL,
  `usr_password` VARCHAR(255) NOT NULL,
  `usr_firstname` VARCHAR(255) NOT NULL,
  `usr_lastname` VARCHAR(255) NOT NULL,
  `usr_lang_id` INT(11) NOT NULL DEFAULT 1,
  `usr_role_id` INT(11) NOT NULL DEFAULT 1,
  `usr_admin` INT NOT NULL DEFAULT 0,
  `usr_rights` TEXT NULL DEFAULT NULL,
  `usr_image` MEDIUMBLOB NULL DEFAULT NULL,
  `usr_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usr_last_login_date` DATETIME NULL DEFAULT NULL,
  `usr_is_online` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`usr_id`),
  INDEX `roleId_idx` (`usr_role_id` ASC) VISIBLE,
  INDEX `langId_idx` (`usr_lang_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Melis users';


-- -----------------------------------------------------
-- Table `melis_core_bo_emails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_bo_emails` ;

CREATE TABLE IF NOT EXISTS `melis_core_bo_emails` (
  `boe_id` INT(11) NOT NULL AUTO_INCREMENT,
  `boe_name` VARCHAR(255) NOT NULL,
  `boe_code_name` VARCHAR(255) NOT NULL,
  `boe_from_name` VARCHAR(255) NOT NULL,
  `boe_from_email` VARCHAR(255) NOT NULL,
  `boe_reply_to` VARCHAR(255) NULL,
  `boe_tag_accepted_list` TEXT NULL,
  `boe_content_layout` VARCHAR(255) NULL,
  `boe_content_layout_title` VARCHAR(255) NULL,
  `boe_content_layout_logo` TEXT NULL,
  `boe_content_layout_ftr_info` TEXT NULL,
  `boe_last_edit_date` DATETIME NOT NULL,
  `boe_last_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`boe_id`),
  INDEX `fk_melis_core_bo_emails_melis_core_user1_idx` (`boe_last_user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `melis_core_bo_emails_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_bo_emails_details` ;

CREATE TABLE IF NOT EXISTS `melis_core_bo_emails_details` (
  `boed_id` INT(11) NOT NULL AUTO_INCREMENT,
  `boed_email_id` INT(11) NOT NULL,
  `boed_lang_id` INT(11) NOT NULL,
  `boed_subject` VARCHAR(255) NOT NULL,
  `boed_html` LONGTEXT NOT NULL,
  `boed_text` TEXT NOT NULL,
  PRIMARY KEY (`boed_id`),
  INDEX `fk_melis_core_bo_emails_details_melis_core_bo_emails1_idx` (`boed_email_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `melis_core_log_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_log_type` ;

CREATE TABLE IF NOT EXISTS `melis_core_log_type` (
  `logt_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Log type id',
  `logt_code` VARCHAR(255) NOT NULL COMMENT 'log code is the codename of the action ex. PAGE_PABLISH for publishing a page, ADD_USER for adding new user',
  PRIMARY KEY (`logt_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_log` ;

CREATE TABLE IF NOT EXISTS `melis_core_log` (
  `log_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Log Id',
  `log_title` VARCHAR(255) NOT NULL COMMENT 'log title',
  `log_message` VARCHAR(255) NOT NULL COMMENT 'log message',
  `log_action_status` INT NOT NULL DEFAULT 0 COMMENT 'The status of the action \"1\" or \"0\"',
  `log_type_id` INT(11) NOT NULL COMMENT 'log type it is the foriegn key of melis_core_type id',
  `log_item_id` INT(11) NULL COMMENT 'Log item Id is the foreign key of the item (item can be UserId, SiteId, TemplateId, ProspectId etc...)',
  `log_user_id` INT(11) NOT NULL COMMENT 'User Id who trigger the event',
  `log_date_added` DATETIME NOT NULL COMMENT 'Log date added/created',
  PRIMARY KEY (`log_id`),
  INDEX `fk_melis_core_logs_melis_core_user1_idx` (`log_user_id` ASC) VISIBLE,
  INDEX `fk_melis_core_logs_melis_core_logs_type1_idx` (`log_type_id` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = 'Melis Core Logs';


-- -----------------------------------------------------
-- Table `melis_core_log_type_trans`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_log_type_trans` ;

CREATE TABLE IF NOT EXISTS `melis_core_log_type_trans` (
  `logtt_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Log type translation id',
  `logtt_lang_id` INT(11) NOT NULL COMMENT 'Log type Language Id',
  `logtt_type_id` INT NOT NULL COMMENT 'Log type id foreign key of melis_core_logs_type',
  `logtt_name` VARCHAR(255) NULL COMMENT 'Log type name',
  `logtt_description` VARCHAR(255) NULL COMMENT 'Log type description',
  PRIMARY KEY (`logtt_id`),
  INDEX `fk_melis_core_logs_type_trans_melis_core_lang1_idx` (`logtt_lang_id` ASC) VISIBLE,
  INDEX `fk_melis_core_logs_type_trans_melis_core_logs_type1_idx` (`logtt_type_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_lost_password`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_lost_password` ;

CREATE TABLE IF NOT EXISTS `melis_core_lost_password` (
  `rh_id` INT NOT NULL AUTO_INCREMENT,
  `rh_login` VARCHAR(255) NOT NULL,
  `rh_email` VARCHAR(255) NOT NULL,
  `rh_hash` VARCHAR(255) NOT NULL,
  `rh_date` DATETIME NULL,
  PRIMARY KEY (`rh_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_user_connection_date`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_user_connection_date` ;

CREATE TABLE IF NOT EXISTS `melis_core_user_connection_date` (
  `usrcd_id` INT NOT NULL AUTO_INCREMENT,
  `usrcd_usr_login` INT NOT NULL,
  `usrcd_last_login_date` DATETIME NOT NULL,
  `usrcd_last_connection_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usrcd_id`),
  INDEX `fk_usr_login_idx` (`usrcd_usr_login` ASC) VISIBLE,
  INDEX `fk_usr_last_login_date_idx` (`usrcd_last_login_date` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_microservice_auth`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_microservice_auth` ;

CREATE TABLE IF NOT EXISTS `melis_core_microservice_auth` (
  `msoa_id` INT NOT NULL AUTO_INCREMENT,
  `msoa_user_id` INT NOT NULL,
  `msoa_status` TINYINT(1) NULL DEFAULT 0,
  `msoa_api_key` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`msoa_id`),
  INDEX `fk_user_id_idx` (`msoa_user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_microservice_logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_microservice_logs` ;

CREATE TABLE IF NOT EXISTS `melis_core_microservice_logs` (
  `msl_id` INT NOT NULL AUTO_INCREMENT,
  `msl_user_id` INT NOT NULL,
  `msl_payload` TEXT NOT NULL,
  `msl_response` TEXT NULL,
  `msl_url` TEXT NOT NULL,
  `msl_date_requested` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`msl_id`),
  INDEX `fk_user_id_idx` (`msl_user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_platform_scheme`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_platform_scheme` ;

CREATE TABLE IF NOT EXISTS `melis_core_platform_scheme` (
  `pscheme_id` INT NOT NULL AUTO_INCREMENT,
  `pscheme_name` VARCHAR(45) NULL,
  `pscheme_colors` TEXT NULL,
  `pscheme_sidebar_header_logo` TEXT NULL,
  `pscheme_sidebar_header_text` VARCHAR(45) NULL,
  `pscheme_login_logo` TEXT NULL,
  `pscheme_login_background` TEXT NULL,
  `pscheme_favicon` TEXT NULL,
  `pscheme_is_active` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`pscheme_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `melis_core_dashboards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `melis_core_dashboards` ;

CREATE TABLE IF NOT EXISTS `melis_core_dashboards` (
  `d_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Dashboard plugin ID',
  `d_dashboard_id` VARCHAR(45) NOT NULL COMMENT 'Dashboard ID',
  `d_user_id` INT(11) NOT NULL COMMENT 'Dashboard plugin user ID',
  `d_content` TEXT NULL COMMENT 'Plugins xml data',
  PRIMARY KEY (`d_id`),
  INDEX `fk_melis_core_dashboards_melis_core_user1_idx` (`d_user_id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `melis_core_lang`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `melis_core_lang` (`lang_id`, `lang_locale`, `lang_name`) VALUES (1, 'en_EN', 'English');
INSERT INTO `melis_core_lang` (`lang_id`, `lang_locale`, `lang_name`) VALUES (2, 'fr_FR', 'Français');

COMMIT;


-- -----------------------------------------------------
-- Data for table `melis_core_user_role`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `melis_core_user_role` (`urole_id`, `urole_name`, `urole_rights`, `urole_creation_date`) VALUES (1, 'Custom', NULL, NOW());

COMMIT;


-- -----------------------------------------------------
-- Data for table `melis_core_platform_scheme`
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO `melis_core_platform_scheme` (`pscheme_id`, `pscheme_name`, `pscheme_colors`, `pscheme_sidebar_header_logo`, `pscheme_sidebar_header_text`, `pscheme_login_logo`, `pscheme_login_background`, `pscheme_favicon`, `pscheme_is_active`) VALUES (1, 'MELIS_DEFAULT', '{\"melis_core_platform_color_primary_color\":\"#e61c23\",\"melis_core_platform_color_secondary_color\":\"#ce5459\"}', '/MelisCore/images/dashboard/melis-logo.svg', 'MELIS PLATFORM', '/MelisCore/images/login/melis-box.png', '/MelisCore/images/login/melis-blackboard.jpg', '/favicon.ico', 0);
INSERT INTO `melis_core_platform_scheme` (`pscheme_id`, `pscheme_name`, `pscheme_colors`, `pscheme_sidebar_header_logo`, `pscheme_sidebar_header_text`, `pscheme_login_logo`, `pscheme_login_background`, `pscheme_favicon`, `pscheme_is_active`) VALUES (2, 'MELIS_SCHEME_1', '{\"melis_core_platform_color_primary_color\":\"#e61c23\",\"melis_core_platform_color_secondary_color\":\"#ce5459\"}', '/MelisCore/images/dashboard/melis-logo.svg', 'MELIS PLATFORM', '/MelisCore/images/login/melis-box.png', '/MelisCore/images/login/melis-blackboard.jpg', '/favicon.ico', 1);

COMMIT;

