# FOREST FIRE PREDICTION
###   _Using Deep Learning_ 

[![LinkedIn][linkedin-shield]][linkedin-url]
---
## Table of contents

Use for instance <https://github.com/ekalinin/github-markdown-toc>:

> * [Title](#forest-fire-prediction)
>   * [Table of contents](#table-of-contents)
>   * [Abstract](#abstract)
>   * [Built With](#built-with)
>   * [Proposed Method](#proposed-method)
>     * [Modules of the Project](#modules-of-the-project)
>     * [CNN Models Used](#cnn-models-used)
>   * [Results](#results)
>   * [Conclusion](#conclusion)

## Abstract

Forest fires are a major environmental issue, creating economic and ecological damage as well as endangering human lives. Forest fires or wildfires are spontaneously occurring fires in forests, bushes and plains and can occasionally be controlled. Uncontrolled wildfires are most often associated with dry hot summers, set off by lightning or human error. 
By cause, it is classified into – 
*  Natural or Controlled forest fire.
*  Forest fires caused by heat generated in the litter and other biomes in summer through the carelessness of people (human neglect).
*  Forest fires purposely caused by local inhabitants.

Predicting such an environmental issue becomes a critical concern to mitigate this threat. Several technologies and new methods have been proposed to predict and detect forest fires, the widely used one is WSN.

The conventional fire detection methods have had an accuracy ranging between 80% to 91%. Hence, to detect fire automatically, more accurately and preferably, in its early stages a deep learning image recognition method, based on convolutional neural networks is proposed. Here, a lightweight Deep neural network MobileNet is used to classify the images of forest fires into “Fire & No Fire”. With the help of MobileNet, we have achieved an accuracy of 98% on the Fire images dataset. It presents good accuracy in estimating the fire when compared with other approaches in the literature.

---
## Built With
| Built | Using |
| ----------- | ----------- |
| Operating System | Windows 10 |
| Back-end | TensorFlow |
| Tool | Teachable Machine |
| Deployment | HTML/CSS/JS |

---
## Proposed Method
> In the proposed system, forest fire images were given as input. Fire images are manually separated, equalized, enhanced, and augmented as a part of the data pre-processing procedures. At last, the pre-processed data is fed into different models with different parameters to decide the favourable model that is well suited to help detect the wildfire before it is too late to avoid the damages.

### Modules of the Project
![Modules](/img/CNN_Flow.png)

### CNN Models Used
CNN is a neural network that has one or more convolutional layers and are used mainly for image processing, classification, segmentation and also for other auto correlated data. Architectures of CNN like :
**VGG16, MobileNet and MobileNet via Teachable Machine** are tested and compared.
1. VGG16
    : The learning rate for this model is 0.0003 and Adam Optimizer has been used. The obtained accuracy is around 89%.
2. MOBILENET
    : The model has been set with the learning rate 0.0003 and run for 20 epochs. The accuracy obtained was around 82%
3. MOBILENET _via_ Teachable Machine
    : The model was tweaked with different learning rates to attain the best results.
    LR=[0.0003, 0.0001, 0.001, 0.01] _&_ 20 t0 200 epochs have been run.

## Results
Accuracy is treated as one of the most important parameters for analyzing the proposed work. It can be calculated easily by dividing the number of correct predictions by the number of total predictions.
> The best Accuracy was seen in the MobileNet model trained via Teachable Machine.
**98.5%**

# Conclusion
Various models and different methods of implementations have been done and dusted. It is shown that the proposed method using MobileNet has a high recognition rate and yields an average accuracy of around 98%. This can be extensively used to detect forest fires and prevent devastating consequences.

Furthermore, the model can be made to detect forest fires in real time with the help of satellite imagery providers and other image sources that works in real time. In addition to that the model can be improved to perform detection from videos.

[linkedin-shield]: https://img.shields.io/badge/ForestFire-Page-brightgreen?style=for-the-badge&logo=html5
[linkedin-url]: https://osnaren.github.io/ForestFire/
