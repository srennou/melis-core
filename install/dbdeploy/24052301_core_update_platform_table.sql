ALTER TABLE `melis_core_platform` ADD `plf_bundle_cache_time` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Use as parameter time in bundle file for caching' AFTER `plf_activate_cache`;