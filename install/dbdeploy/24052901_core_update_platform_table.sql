ALTER TABLE `melis_core_platform` ADD `plf_scheme_file_time` VARCHAR(50) NULL COMMENT 'Use in scheme file so it will not be redownloaded everytime' AFTER `plf_bundle_cache_time`;