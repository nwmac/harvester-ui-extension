// https://github.com/harvester/dashboard/releases/tag/v1.3.0
const featuresV130 = [
  'supportHarvesterClusterVersion'
];

// https://github.com/harvester/dashboard/releases/tag/v1.3.1
const featuresV131 = [
  ...featuresV130,
  'autoRotateRke2CertsSetting',
  'supportBundleNodeCollectionTimeoutSetting'
];

// https://github.com/harvester/dashboard/releases/tag/v1.3.2
const featuresV132 = [
  ...featuresV131,
  'kubeconfigDefaultTokenTTLMinutesSetting',
  'improveMaintenanceMode',
];

// TODO: change to https://github.com/harvester/dashboard/releases/tag/v1.4.0 after v1.4.0 release
// https://github.com/harvester/dashboard/releases/tag/v1.4.0-rc5
// https://github.com/harvester/dashboard/releases/tag/v1.4.0-rc4
// https://github.com/harvester/dashboard/releases/tag/v1.4.0-rc3
// https://github.com/harvester/dashboard/releases/tag/v1.4.0-rc2
// https://github.com/harvester/dashboard/releases/tag/v1.4.0-rc1
const featuresV140 = [
  ...featuresV132,
  'cpuPinning',
  'usbPassthrough',
  'volumeEncryption',
  'schedulingVMBackup',
  'vmSnapshotQuota',
  'longhornV2LVMSupport',
  'improveMaintenanceMode',
];

export const RELEASE_FEATURES = {
  'v1.3.0': featuresV130,
  'v1.3.1': featuresV131,
  'v1.3.2': featuresV132,
  'v1.4.0': featuresV140,
};
