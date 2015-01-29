<?php

namespace Kwam\KwamBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Kwam
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Kwam\KwamBundle\Entity\KwamRepository")
 */
class Kwam
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="topic", type="string", length=2048)
     */
    private $topic;
    /**
     * @var string
     *
     * @ORM\Column(name="reason", type="text")
     */
    private $reason;

    /**
     * @var string
     *
     * @ORM\Column(name="main_picture", type="string", length=255)
     */
    private $mainPicture;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set topic
     *
     * @param string $topic
     * @return Kwam
     */
    public function setTopic($topic)
    {
        $this->topic = $topic;

        return $this;
    }

    /**
     * Get topic
     *
     * @return string 
     */
    public function getTopic()
    {
        return $this->topic;
    }

    /**
     * Set reason
     *
     * @param string $reason
     * @return Kwam
     */
    public function setReason($reason)
    {
        $this->topic = $reason;

        return $this;
    }

    /**
     * Get reason
     *
     * @return string 
     */
    public function getReason()
    {
        return $this->reason;
    }

    /**
     * Set mainPicture
     *
     * @param string $mainPicture
     * @return Kwam
     */
    public function setMainPicture($mainPicture)
    {
        $this->mainPicture = $mainPicture;

        return $this;
    }

    /**
     * Get mainPicture
     *
     * @return string 
     */
    public function getMainPicture()
    {
        return $this->mainPicture;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return Kwam
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }
}
