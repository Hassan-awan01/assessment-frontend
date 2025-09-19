export type ResponseType = {
  clean_prediction: number;
  adversarial_prediction: number;
  epsilon: number;
  adversarial_image_b64: string;
  attack_success: string;
};
